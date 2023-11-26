import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Response, RestBindings} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {compare} from 'bcryptjs';
import {Users, UsersRelations, UsersWithRelations} from '../models';
import {UsersRepository} from '../repositories';

export declare type Credentials = {
  email: string;
  password: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class MyUserService {
  constructor(
    @repository('UsersRepository') public usersRepository: UsersRepository,
    @inject(RestBindings.Http.RESPONSE, {optional: true}) public response?: Response,
  ) {}

  public usrAccntVerification(user: Partial<Users & UsersRelations> | undefined | null) {
    if (!user) {
      throw this.response?.status(401).send({
        success: false,
        code: '1001',
        message: 'User account not found',
      });
    }

    if (!user.email_confirmed) {
      throw this.response?.status(401).send({
        success: false,
        code: '1007',
        message: 'Email is not confirmed',
      });
    }

    if (!user.entrepriseId) {
      throw this.response?.status(400).send({
        success: false,
        code: '1003',
        message: 'Entreprise account not found',
      });
    }
  }

  async verifyCredentials(credentials: Credentials): Promise<Users & UsersRelations> {
    const user = await this.usersRepository.findOne({
      where: {email: credentials.email},
      include: ['entreprise', 'person', 'userHasRoles'],
    });

    this.usrAccntVerification(user);

    console.log('pwd : ' + user!.password_digest);
    const isMatch = await compare(credentials.password, user!.password_digest!);
    if (!isMatch) {
      throw this.response?.status(401).send({
        success: false,
        code: '1002',
        message: 'Invalid email or password',
      });
    }
    return user!;
  }

  convertToUserProfile(user: Users): UserProfile {
    let userProfile: any = {};

    userProfile.name = user.mobile_phone;
    userProfile[securityId] = user.id;
    userProfile.email = user.email;
    return userProfile;
  }

  async findUserById(id: number): Promise<Users & UsersWithRelations> {
    const foundUser = await this.usersRepository.findOne({
      where: {id: id},
    });
    if (!foundUser) {
      throw this.response?.status(401).send({
        success: false,
        code: '1001',
        message: 'Invalid email or password.',
      });
    }
    return foundUser;
  }
}
