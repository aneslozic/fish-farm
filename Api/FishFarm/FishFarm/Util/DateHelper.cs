using System;

namespace FishFarm.Util
{
    public static class DateHelper
    {
        public static long DateTimeUtcToUnixTime(DateTime dateTime)
        {
            return (long) dateTime.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds;
        }
        
        public static long? DateTimeUtcToUnixTime(DateTime? dateTime)
        {
            return dateTime == null ? null : (long?) DateTimeUtcToUnixTime(dateTime.GetValueOrDefault());
        }
        
    }
}