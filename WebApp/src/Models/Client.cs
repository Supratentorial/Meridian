﻿using System;
using System.Collections.Generic;

namespace Meridian.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class Client
    {
        public int ClientId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public List<string> MiddleNames { get; set; }
        public DateTime DateOfBirth { get; set; }

        public List<Matter> Matters { get; set; }
        
    }
}
