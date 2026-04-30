import { NextFunction } from 'connect'
import {Request, Response} from 'express'
import jwt, { JwtPayload } from "jsonwebtoken"
import { UserRole } from '../../generated/prisma/enums.js'