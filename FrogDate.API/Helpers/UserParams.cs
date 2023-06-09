namespace FrogDate.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 48;
        public int PageNumber {get;set;} = 1;
        public int pageSize = 24;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public int UserId { get; set; }
        public string? Gender { get; set; } = "all";

        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string? ZodiacSign { get; set; } = "all";

        public string? OrderBy {get; set;}

        public bool UserLikes {get; set;} = false;
        public bool UserIsLiked {get; set;} = false;

    }

        
    
}