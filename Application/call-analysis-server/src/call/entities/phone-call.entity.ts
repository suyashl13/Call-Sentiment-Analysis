import { Length } from "class-validator";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PhoneCall {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'customer_name' })
    customerName: string

    @Column({ name: 'customer_phone' })
    @Length(12, 12, { message: 'Phone number must be 12 digits long' })
    customerPhone: string

    @ManyToOne(() => User, (user) => user.phoneCalls)
    user: User

    @Column({ name: 'call_recording_url' })
    callRecordingUrl: string

    @Column({ name: 'call_date_time' })
    callDateTime: Date

    @Column({ name: 'call_status' })
    callRecordingStatus: string

    @Column({ name: 'call_duration', nullable: true, default: null })
    generatedCallSentiment: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}