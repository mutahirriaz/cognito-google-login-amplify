#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CognitoBackendStack } from '../lib/cognito-backend-stack';

const app = new cdk.App();
new CognitoBackendStack(app, 'CognitoBackendStack');
