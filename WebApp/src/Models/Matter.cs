﻿using System.Collections.Generic;

namespace Meridian.Models
{
    public class Matter
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public List<Client> Client { get; set; }
        public List<Event> Events { get; set; }
        public List<Staff> StaffResponsible { get; set; }
    }
}
