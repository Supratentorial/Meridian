using System;
using System.Collections.Generic;

namespace Meridian.Models
{
    public class Contact
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public List<string> MiddleNames { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<PhoneNumber> PhoneNumbers { get; set; }
        public List<EmailAddress> EmailAddresses { get; set; }
    }
}
