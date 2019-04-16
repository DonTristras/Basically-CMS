using LiteDB;
using System;

namespace Basically.Infrastructure
{
    public interface IConnector
    {
        Guid Create<T>(T Model);
        void Delete<T>(Guid id);
        LiteCollection<T> List<T>();
        void Update<T>(T Model);
        T GetByID<T>(Guid id);
    }
}