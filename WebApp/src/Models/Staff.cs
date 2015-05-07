namespace Meridian.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class Staff
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
