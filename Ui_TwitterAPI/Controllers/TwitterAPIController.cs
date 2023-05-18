 using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SocialOpinionAPI.Core;
using SocialOpinionAPI.Models.Blocks;
using SocialOpinionAPI.Models.FilteredStream;
using SocialOpinionAPI.Models.Likes;
using SocialOpinionAPI.Models.SampledStream;
using SocialOpinionAPI.Models.Tweets;
using SocialOpinionAPI.Services.Blocks;
using SocialOpinionAPI.Services.FilteredStream;
using SocialOpinionAPI.Services.Likes;
using SocialOpinionAPI.Services.Mutes;
using SocialOpinionAPI.Services.Retweets;
using SocialOpinionAPI.Services.SampledStream;
using SocialOpinionAPI.Services.Tweet;
using SocialOpinionAPI.Services.Users;
using System.Text;
using System;
using Ui_TwitterAPI.Core;
using Ui_TwitterAPI.Core.IF;

namespace Ui_TwitterAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TwitterAPIController : ControllerBase
    {
        private readonly IGetOAuthInfo _GetOAuthInfo;
        TweetService _tweetsService;
        public TwitterAPIController(IGetOAuthInfo GetOAuthInfo)
        {
            _GetOAuthInfo = GetOAuthInfo;
            _tweetsService = new TweetService(_GetOAuthInfo.Get());
        }

        //Get Tweet
        #region Get Tweet
        [HttpGet]
        [Route("[action]/{id}", Name = nameof(GetTweet))]
        public ActionResult GetTweet(string id)
        {
            try
            {

                TweetModel tweetModel = _tweetsService.GetTweet(id);
                return Ok(tweetModel);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }

        }

        #endregion

        //post tweet
        #region post tweet 

        [HttpPost]
        [Route("[action]", Name = nameof(PostTweetV1))]
        public ActionResult PostTweetV1([FromBody] TweetModel tweet)
        {
            try
            {
                var newTweetModel = _tweetsService.PostTweetV1(tweet.data.text);
                return Ok(newTweetModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



#endregion

        // testing Filtered Stream
        #region testing Filtered Stream 
        [HttpPost]
        [Route("[action]", Name = nameof(FilteredStream))]
        public ActionResult FilteredStream([FromBody] dynamic data)
        {
            try
            {
                FilteredStreamService filteredStreamService = new FilteredStreamService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());


                //{ tag = "testing #iPhone", Value = "#iphone" }
                List<FilteredStreamRule> rules = filteredStreamService.CreateRule(
                    new MatchingRule { tag = _data.taq.ToString(), Value = _data.Value.ToString() });

                filteredStreamService.DataReceivedEvent += FilteredStreamService_DataReceivedEvent;

                return Ok(filteredStreamService.StartStream("https://api.twitter.com/2/tweets/search/stream?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,source,text,withheld&expansions=author_id&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld", 10, 5)
             );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
         private static void StreamService_DataReceivedEvent(object sender, EventArgs e)
        {
            SampledStreamService.DataReceivedEventArgs eventArgs = e as SampledStreamService.DataReceivedEventArgs;
            SampledStreamModel model = eventArgs.StreamDataResponse;
            
        }

        private static void FilteredStreamService_DataReceivedEvent(object sender, EventArgs e)
        {
            FilteredStreamService.DataReceivedEventArgs eventArgs = e as FilteredStreamService.DataReceivedEventArgs;
            FilteredStreamModel model = eventArgs.FilteredStreamDataResponse;
        }

        #endregion


        // Sampled Stream Service Test
        #region Sampled Stream Service Test
        [HttpGet]
        [Route("[action]", Name = nameof(SampledStream))]
        public ActionResult SampledStream()
        {

            try
            {

                SampledStreamService streamService = new SampledStreamService(_GetOAuthInfo.Get());
                streamService.DataReceivedEvent += StreamService_DataReceivedEvent;
                //maxConnectionAttempts=5,maxTweets=50

                streamService.StartStream("https://api.twitter.com/2/tweets/sample/stream?expansions=attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id", 100,5 );

                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        #endregion

        // Likes Lookup
        #region Likes Lookup
        LikesService likesService;
        [HttpGet]
        [Route("[action]", Name = nameof(ListOfTweets))]
        public ActionResult ListOfTweets([FromBody]dynamic data)
        {
            try
            {
                likesService = new LikesService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //UserID="38906681";
                List<LikesModel> listOfTweets = likesService.GetUsersLikedTweets(_data.UserID.ToString(), 5, 1);
                return Ok(listOfTweets);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
         
        }
        [HttpGet]
        [Route("[action]", Name = nameof(ListOfUsersWhoLikedATweet))]
        public ActionResult ListOfUsersWhoLikedATweet([FromBody]dynamic data)
        {

            try
            {
                likesService = new LikesService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //TweetID="1402547535391121409"
                List<SocialOpinionAPI.Models.Likes.User> listOfUsersWhoLikedATweet = likesService.GetLikingUsers(_data.TweetID.ToString());

                return Ok(listOfUsersWhoLikedATweet);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
             }

        }
        [HttpGet]
        [Route("[action]", Name = nameof(LikeTweet))]
        public  ActionResult LikeTweet([FromBody]dynamic data)
        {

            try
            {
                likesService = new LikesService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //UserID="958676983",TweetID="1402590400557240324"
                bool hasLiked = likesService.LikeTweet(_data.UserID.ToString(), _data.TweetID.ToString());
                return Ok(hasLiked);   

            }
            catch (Exception ex)
            {

                return  BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("[action]", Name = nameof(unLikeTweet))]
        public ActionResult unLikeTweet([FromBody] dynamic data)
        {

            try
            {
                likesService = new LikesService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //UserID="958676983",TweetID="1402590400557240324"
                bool hasLiked = likesService.UnLikeTweet(_data.UserID.ToString(), _data.TweetID.ToString());
                return Ok(hasLiked);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        #endregion

        // Blocks Service
        #region Blocks Service

        BlocksService blocksService;
        [HttpGet]
        [Route("[action]", Name = nameof(listsBlocks))]
        public ActionResult listsBlocks([FromBody]dynamic data) {
            try
            {
                blocksService = new BlocksService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //USerID="958676983"
                List<BlocksModel> lists = blocksService.GetBlocks(_data.UserID.ToString(), 10);

                return Ok(lists);  
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("[action]", Name = nameof(Block))]
        public ActionResult Block([FromBody] dynamic data)
        {
            try
            {
                blocksService = new BlocksService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //USerID="958676983",Target_userID="34655603";
                bool blockedResult = blocksService.Block(_data.UserID.ToString(), _data.Target_userID.ToString());

                return Ok(blockedResult);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("[action]", Name = nameof(UnBlock))]
        public ActionResult UnBlock([FromBody] dynamic data)
        {
            try
            {
                blocksService = new BlocksService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //USerID="958676983",Target_userID="34655603";
                bool Result = blocksService.UnBlock(_data.UserID.ToString(), _data.Target_userID.ToString());

                return Ok(Result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        #endregion

        // Mutes Service
        #region Mutes Service

        MutesService mutesService; 

        [HttpGet]
        [Route("[action]", Name = nameof(Mute))]
        public ActionResult Mute([FromBody] dynamic Data)
        {
            try
            {
                mutesService = new MutesService(_GetOAuthInfo.Get());
                //USerID="958676983",Target_userID="34655603",isMute=true;
                bool isMuting = false;
                if (Data.isMute)
                {


                    isMuting = mutesService.Mute(Data.UserID, Data.Target_userID);
                    return Ok(isMuting);

                }
                else
                {
                    isMuting = mutesService.UnMute(Data.UserID, Data.Target_userID); 
                    return Ok(isMuting);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("[action]", Name = nameof(GetMutes))]
        public   ActionResult GetMutes([FromBody] dynamic Data) {

            try
            {
                mutesService = new MutesService(_GetOAuthInfo.Get());
                //USerID="958676983",Target_userID="34655603",isMute=true;
             var listMuts=   mutesService.GetMutes(Data.UserID, Data.Target_userID);
           return     Ok(listMuts);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        #endregion

        // Retweet Service
        #region Retweet Service

        RetweetsService retweetService;
        [HttpGet]
        [Route("[action]", Name = nameof(GetWhoRetweetedTweet))]
        public ActionResult GetWhoRetweetedTweet([FromBody]dynamic data) {
            try
            {

                retweetService = new RetweetsService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //tweetID="1413595913331826694"
                var result = retweetService.GetWhoRetweetedTweet(_data.tweetID.ToString());
                return Ok(result);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        
        }


        [HttpGet]
        [Route("[action]", Name = nameof(RemoveRetweet))]
        public ActionResult RemoveRetweet([FromBody] dynamic data)
        {
            try
            {

                retweetService = new RetweetsService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                //source_tweetID="1413595913331826694",UserID="958676983"
                bool retweeted = retweetService.RemoveRetweet(_data.UserID.ToString(), _data.source_tweetID.ToString());
                return Ok(retweeted);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
        [HttpGet]
        [Route("[action]", Name = nameof(Retweet))]
        public ActionResult Retweet([FromBody] dynamic data)
        {
            try
            {

                retweetService = new RetweetsService(_GetOAuthInfo.Get());
                dynamic _data = JsonConvert.DeserializeObject<dynamic>(data.ToString());
                //source_tweetID="1413595913331826694",UserID="958676983"
                bool retweeted = retweetService.Retweet(_data.UserID.ToString(), _data.source_tweetID.ToString());
                return Ok(retweeted);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }


        #endregion

        //My sample Stream
        #region sample Stream

        
        [HttpGet]
        [Route("[action]", Name = nameof(MyStream))]
        public ActionResult MyStream()
        {
            try
            {
                string[] words = { "Random", "Text" ,"Twitter API ","Test Tweet Stream"};
                RandomText rText = new RandomText(words);
                List<dynamic> ListStream = new List<dynamic>();
                Random rnd = new Random();


                for (int i = 0; i < 57; i++)
                {

                    ListStream.Add(new
                    {
                        author_id = rnd.Next(999999999),
                        created_at = DateTime.Now.ToShortDateString()+" " +DateTime.Now.ToLongTimeString(),
                        id = rnd.Next(99999999).ToString()+ rnd.Next(99999999).ToString(),
                        edit_history_tweet_ids = rnd.Next(99999999).ToString() + rnd.Next(99999999).ToString(),
                        text = rText.AddContentParagraphs(1, 1, 10, 1, 10)
                    }); ;
                }

                return Ok(new  { Data = ListStream});

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        #endregion



    }
} 
