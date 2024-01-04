import { IsEmail } from "class-validator";
import { PhoneCall } from "src/call/entities/phone-call.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: 1 })
  role: number;

  @Column({ name: "profile_picture" })
  profilePicture: string;

  @Column({ default: true }) // TODO: change to false in production make it true by admin consent.
  isActive: boolean;

  @OneToMany(() => PhoneCall, (phoneCall) => phoneCall.createdBy)
  phoneCalls: PhoneCall[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export { User };
