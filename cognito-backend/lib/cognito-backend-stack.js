"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoBackendStack = void 0;
const cdk = require("@aws-cdk/core");
;
const cognito = require("@aws-cdk/aws-cognito");
class CognitoBackendStack extends cdk.Stack {
    constructor(scope, id, props) {
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
                callbackUrls: ["http://localhost:8000/"],
            },
        });
        const domain = userPool.addDomain("domain", {
            cognitoDomain: {
                domainPrefix: "my-test-demo",
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
exports.CognitoBackendStack = CognitoBackendStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29nbml0by1iYWNrZW5kLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29nbml0by1iYWNrZW5kLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUFBLENBQUM7QUFDdEMsZ0RBQWdEO0FBR2hELE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUM1RCxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVU7WUFDbkQsZ0JBQWdCLEVBQUU7Z0JBQ2hCLFVBQVUsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSTthQUNoRDtZQUVELFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSTthQUNaO1lBRUQsa0JBQWtCLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRTtvQkFDTCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZDthQUNGO1NBRUYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3pGLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSwwRUFBMEU7WUFDcEYsWUFBWSxFQUFFLDBCQUEwQjtZQUN4QyxnQkFBZ0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO2dCQUM3QyxTQUFTLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQjtnQkFDdEQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0I7YUFDNUQ7WUFDRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztTQUN2QyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN6RSxRQUFRO1lBQ1IsS0FBSyxFQUFFO2dCQUNMLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsYUFBYSxFQUFFO2dCQUNiLFlBQVksRUFBRSxjQUFjO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSw4QkFBOEIsRUFBRTtZQUN0RCxLQUFLLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjtTQUN2QyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzVDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzNDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNoQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVU7U0FDekIsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBcEVELGtEQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJzs7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcbmltcG9ydCB7IFVzZXJQb29sIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWNvZ25pdG8nO1xuXG5leHBvcnQgY2xhc3MgQ29nbml0b0JhY2tlbmRTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcblxuICAgIGNvbnN0IHVzZXJQb29sID0gbmV3IGNvZ25pdG8uVXNlclBvb2wodGhpcywgXCJnb29nbGVVc2VyUG9vbFwiLCB7XG4gICAgICBzZWxmU2lnblVwRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGFjY291bnRSZWNvdmVyeTogY29nbml0by5BY2NvdW50UmVjb3ZlcnkuRU1BSUxfT05MWSxcbiAgICAgIHVzZXJWZXJpZmljYXRpb246IHtcbiAgICAgICAgZW1haWxTdHlsZTogY29nbml0by5WZXJpZmljYXRpb25FbWFpbFN0eWxlLkNPREUsXG4gICAgICB9LFxuXG4gICAgICBhdXRvVmVyaWZ5OiB7XG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgfSxcblxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG5cbiAgICB9KTtcblxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGNvZ25pdG8uVXNlclBvb2xJZGVudGl0eVByb3ZpZGVyR29vZ2xlKHRoaXMsIFwiZ29vZ2xlUHJvdmlkZXJmb3JQb29sXCIsIHtcbiAgICAgIHVzZXJQb29sOiB1c2VyUG9vbCxcbiAgICAgIGNsaWVudElkOiBcIjgzMzAwMzU1ODY3MC1zNGFuNW1jcHBpbWE1Z3I0cjNpbmZlc3VxaTdrNGI0by5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiLFxuICAgICAgY2xpZW50U2VjcmV0OiBcIm0xUVB0TTdLaU9DNkNQVmw1Nk9yc1ctclwiLFxuICAgICAgYXR0cmlidXRlTWFwcGluZzoge1xuICAgICAgICBlbWFpbDogY29nbml0by5Qcm92aWRlckF0dHJpYnV0ZS5HT09HTEVfRU1BSUwsXG4gICAgICAgIGdpdmVuTmFtZTogY29nbml0by5Qcm92aWRlckF0dHJpYnV0ZS5HT09HTEVfR0lWRU5fTkFNRSxcbiAgICAgICAgcGhvbmVOdW1iZXI6IGNvZ25pdG8uUHJvdmlkZXJBdHRyaWJ1dGUuR09PR0xFX1BIT05FX05VTUJFUlMsXG4gICAgICB9LFxuICAgICAgc2NvcGVzOiBbXCJwcm9maWxlXCIsIFwiZW1haWxcIiwgXCJvcGVuaWRcIl0sXG4gICAgfSk7XG5cbiAgICB1c2VyUG9vbC5yZWdpc3RlcklkZW50aXR5UHJvdmlkZXIocHJvdmlkZXIpO1xuXG4gICAgY29uc3QgdXNlclBvb2xDbGllbnQgPSBuZXcgY29nbml0by5Vc2VyUG9vbENsaWVudCh0aGlzLCBcIm15QW1wbGlmeUNsaWVudFwiLCB7XG4gICAgICB1c2VyUG9vbCxcbiAgICAgIG9BdXRoOiB7XG4gICAgICAgIGNhbGxiYWNrVXJsczogW1wiaHR0cDovL2xvY2FsaG9zdDo4MDAwL1wiXSwgLy8gVGhpcyBpcyB3aGF0IHVzZXIgaXMgYWxsb3dlZCB0byBiZSByZWRpcmVjdGVkIHRvIHdpdGggdGhlIGNvZGUgdXBvbiBzaWduaW4uIHRoaXMgY2FuIGJlIGEgbGlzdCBvZiB1cmxzLlxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRvbWFpbiA9IHVzZXJQb29sLmFkZERvbWFpbihcImRvbWFpblwiLCB7XG4gICAgICBjb2duaXRvRG9tYWluOiB7XG4gICAgICAgIGRvbWFpblByZWZpeDogXCJteS10ZXN0LWRlbW9cIiwgLy8gU0VUIFlPVVIgT1dOIERvbWFpbiBQUkVGSVggSEVSRVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiYXdzX3VzZXJfcG9vbHNfd2ViX2NsaWVudF9pZFwiLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICB9KTtcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcImF3c19wcm9qZWN0X3JlZ2lvblwiLCB7XG4gICAgICB2YWx1ZTogdGhpcy5yZWdpb24sXG4gICAgfSk7XG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJhd3NfdXNlcl9wb29sc19pZFwiLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiZG9tYWluXCIsIHtcbiAgICAgIHZhbHVlOiBkb21haW4uZG9tYWluTmFtZSxcbiAgICB9KTtcblxuICB9XG59XG4iXX0=