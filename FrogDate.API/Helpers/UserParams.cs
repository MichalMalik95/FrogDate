namespace FrogDate.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 48;
        public int PageNumber {get;set;} = 1;
        private int PageSize = 24;
        public int MyProperty
        {
            get { return PageSize; }
            set { PageSize = (value > MaxPageSize) ? MaxPageSize : value }
        }
        
    }
}