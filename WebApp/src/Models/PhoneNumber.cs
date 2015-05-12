namespace Meridian.Models
{
    public class PhoneNumber
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int AreaCode { get; set; }
        public int CountryCode { get; set; }
        public string Type { get; set; }
        public bool IsPreferred { get; set; }
    }
}
