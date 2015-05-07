namespace Meridian.Models
{
    public class EmailAddress
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public bool IsPreferred { get; set; }
        public string Type { get; set; }
    }
}
