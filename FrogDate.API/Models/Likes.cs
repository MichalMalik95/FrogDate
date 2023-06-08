namespace FrogDate.API.Models
{
    public class Likes
    {
        public int UserLikesId { get; set; }
        public int UserIsLikedId { get; set; }

        // navigation properties
        public User UserLikes { get; set; }
        public User UserIsLiked { get; set; }
    }
}