using System;
using System.Collections.Generic;
using System.Text;

namespace TeacherKit.Domain.Exceptions
{
    public class InexistentResourceException : Exception
    {
        public InexistentResourceException() : base() { }
        public InexistentResourceException(string msg) : base(msg) { }

    }
}
