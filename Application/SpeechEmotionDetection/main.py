import time
import sqlite3
from sample import Predict
import os
import json

dbconn = sqlite3.connect("../call-analysis-server/db.sqlite")

current_dir = os.getcwd()
parent_dir = os.path.dirname(current_dir)


res =  dbconn.execute("select * from phone_call where call_status = 'pending'")
base_dir = os.path.dirname(__file__)

while True:
    for row in res.fetchall():
        id = row[0]
        file = row[3]

        full_path = os.path.join(parent_dir, "call-analysis-server/" + file)

        result = Predict(full_path)

        dbconn.execute("UPDATE phone_call SET call_sentiment = ? WHERE id = ?", (json.dumps(result), id))
        dbconn.execute("UPDATE phone_call SET call_status = ? WHERE id = ?", ("Predicted", id))
        dbconn.commit()
    
    time.sleep(2)

