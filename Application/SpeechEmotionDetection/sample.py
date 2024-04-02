import librosa
import numpy as np
import keras
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from keras.utils import to_categorical
import math

Y=["happy", "sad", "angry", "neutral", "disgust", "fear", "ps"]

encoder = OneHotEncoder()
Y = encoder.fit_transform(np.array(Y).reshape(-1,1)).toarray()


def noise(data):
    noise_amp = 0.035*np.random.uniform()*np.amax(data)
    data = data + noise_amp*np.random.normal(size=data.shape[0])
    return data

def stretch(data):
    return librosa.effects.time_stretch(data, rate=0.8)

def shift(data):
    shift_range = int(np.random.uniform(low=-5, high = 5)*1000)
    return np.roll(data, shift_range)

def pitch(data, sampling_rate, pitch_factor=0.7):
    return librosa.effects.pitch_shift(data, sr=sampling_rate, n_steps=pitch_factor)

def extract_features(data,sample_rate):
    # ZCR
    result = np.array([])
    zcr = np.mean(librosa.feature.zero_crossing_rate(y=data).T, axis=0)
    result=np.hstack((result, zcr))

    # Chroma_stft
    stft = np.abs(librosa.stft(data))
    chroma_stft = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
    result = np.hstack((result, chroma_stft))

    # MFCC
    mfcc = np.mean(librosa.feature.mfcc(y=data, sr=sample_rate).T, axis=0)
    result = np.hstack((result, mfcc))

    # Root Mean Square Value
    rms = np.mean(librosa.feature.rms(y=data).T, axis=0)
    result = np.hstack((result, rms))

    # MelSpectogram
    mel = np.mean(librosa.feature.melspectrogram(y=data, sr=sample_rate).T, axis=0)
    result = np.hstack((result, mel))
    
    return result

def get_features(path):
    
    data, sample_rate = librosa.load(path, duration=2.5, offset=0.6)
    res1 = extract_features(data,sample_rate)
    result = np.array(res1)
    
    noise_data = noise(data)
    res2 = extract_features(noise_data,sample_rate)
    result = np.vstack((result, res2))
    
    new_data = stretch(data)
    data_stretch_pitch = pitch(new_data, sample_rate)
    res3 = extract_features(data_stretch_pitch,sample_rate)
    result = np.vstack((result, res3))
    
    return result


def Predict(AudioPath):
    model = keras.models.load_model("./models/Prediction.h5")
    path_ = AudioPath
    X_ = np.array(get_features(path_))

    scaler = StandardScaler()
    X_ = scaler.fit_transform(X_)

    pred_test_ = model.predict(np.expand_dims(X_, axis=2))
    y_pred_ = encoder.inverse_transform(pred_test_)
    print(y_pred_[0][0])

    op = {}

    for value, emotion in zip(pred_test_[0], encoder.categories_[0]):
        value*=100
        op[emotion] = math.floor(value)
        print(emotion, f"{value}")

    return op
# Predict("./Flat-buyer versus Lodhas Sales Girl - CALL-RECORDING about Lodha Palava City Lodha gets trolled [TubeRipper.com].wav")