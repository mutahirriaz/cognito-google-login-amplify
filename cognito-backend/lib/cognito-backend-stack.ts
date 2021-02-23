import * as cdk from '@aws-cdk/core';;
import * as cognito from '@aws-cdk/aws-cognito';
import { UserPool } from '@aws-cdk/aws-cognito';

export class CognitoBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const userPool = new cognito.UserPool(this, "googleUserPool", {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },

      autoVerify: {
        email: true,
      },

      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },

    });

    const provider = new cognito.UserPoolIdentityProviderGoogle(this, "googleProviderforPool", {
      userPool: userPool,
      clientId: "833003558670-s4an5mcppima5gr4r3infesuqi7k4b4o.apps.googleusercontent.com",
      clientSecret: "m1QPtM7KiOC6CPVl56OrsW-r",
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
      },
      scopes: ["profile", "email", "openid"],
    });

    userPool.registerIdentityProvider(provider);

    const userPoolClient = new cognito.UserPoolClient(this, "myAmplifyClient", {
      userPool,
      oAuth: {
        callbackUrls: ["http://localhost:8000/"], // This is what user is allowed to be redirected to with the code upon signin. this can be a list of urls.
      },
    });

    const domain = userPool.addDomain("domain", {
      cognitoDomain: {
        domainPrefix: "my-test-demo", // SET YOUR OWN Domain PREFIX HERE
      },
    });

    new cdk.CfnOutput(this, "aws_user_pools_web_client_id", {
      value: userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, "aws_project_region", {
      value: this.region,
    });
    new cdk.CfnOutput(this, "aws_user_pools_id", {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, "domain", {
      value: domain.domainName,
    });

  }
}
