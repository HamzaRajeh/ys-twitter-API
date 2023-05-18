 using SocialOpinionAPI.Core;
using Ui_TwitterAPI.Core.IF;

namespace Ui_TwitterAPI.Core
{
    public class GetOAuthInfo: IGetOAuthInfo
    {
        private readonly IConfiguration _configuration;
        public GetOAuthInfo(IConfiguration configuration)
        {
            _configuration= configuration;

        }

 
        public   OAuthInfo Get()
        {
            var _ConsumerKey = _configuration.GetValue<string>("OAuth1:ConsumerKey");
            var _ConsumerSecret = _configuration.GetValue<string>("OAuth1:ConsumerSecret");
            var _AccessToken = _configuration.GetValue<string>("OAuth1:AccessToken");
            var _AccessTokenSecret = _configuration.GetValue<string>("OAuth1:AccessTokenSecret");
 
            OAuthInfo oAuthInfo = new OAuthInfo
            {
                AccessSecret = _AccessTokenSecret,
                AccessToken = _AccessToken,
                ConsumerSecret = _ConsumerSecret,
                ConsumerKey = _ConsumerKey

            };
            return oAuthInfo;

        }
    }
}