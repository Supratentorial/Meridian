using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Meridian.Models
{
    public class Address
    {
        public int Id { get; set; }
        public int unitNumber { get; set; }
        public int StreetNumber { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int PostCode { get; set; }
        public bool IsMailing { get; set; }
        public bool IsResidential { get; set; }

    }
}
