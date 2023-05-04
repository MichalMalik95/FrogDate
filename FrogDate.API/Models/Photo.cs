namespace FrogDate.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public DateTime DateAdded {get;set;}
        public bool IsMain { get; set; }
        public string public_id { get; set; }
        public User User { get; set; }  //kaskadowe usuwanie możliwe dzięki temu powiązaniu
        public int UserId { get; set; }
    }
}