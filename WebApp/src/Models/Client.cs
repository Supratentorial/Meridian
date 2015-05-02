using System;
using System.Collections.Generic;

namespace Meridian.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public List<string> MiddleNames { get; set; }

    }
}
