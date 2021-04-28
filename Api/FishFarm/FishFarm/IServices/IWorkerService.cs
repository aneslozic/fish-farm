using System.Threading.Tasks;
using FishFarm.Controllers.DataTransferObjects;

namespace FishFarm.IServices
{
    public interface IWorkerService
    {
        Task CreateWorker(WorkerCreateDto workerCreateDto);
    }
}