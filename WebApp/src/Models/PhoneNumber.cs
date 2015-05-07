namespace Meridian.Models
{
    public class PhoneNumber
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Type { get; set; }
        public bool IsPreferred { get; set; }
    }
}
