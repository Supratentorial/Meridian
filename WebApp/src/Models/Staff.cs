using System;

namespace Meridian.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class Staff : Contact
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime StartDate { get; set; }
        public LegalFirm Firm { get; set; }
    }
}
