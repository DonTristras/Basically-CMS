using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace System.Collections.Generic
{
    public static class LinqExtensions
    {
        /// <summary>
        /// Extension to order a list with order condition ("field name" [desc, asc]) IEnumrable of Dynamic
        /// </summary>
        public static IEnumerable<T> OrderByDynamic<T>(this IEnumerable<T> data, string orderCondition = " ")
        {
            string[] OrderConditionArray = orderCondition.Split(" ");
            if (OrderConditionArray[1].ToLower() == "asc")
            {
                return data.OrderBy(s => s.GetType().GetProperty(OrderConditionArray[0]).GetValue(s));
            }
            else if (OrderConditionArray[1].ToLower() == "desc")
            {
                return data.OrderByDescending(s => s.GetType().GetProperty(OrderConditionArray[0]).GetValue(s));
            }
            else {
                return data;
            }
        }
    }
}
