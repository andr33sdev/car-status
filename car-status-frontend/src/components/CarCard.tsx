
type CarCardProps = {
  id?: number,
  brand: string
  model: string,
  year: number,
  license_plate: string
}

export default function CarCard({ id, brand, model, year, license_plate }: CarCardProps) {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/car.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{license_plate}</div>
        <p className="text-gray-700 text-base">ID: {id}</p>
      </div>
      <div className="flex flex-row justify-between items-end p-5">
        <div className="flex flex-col">
          <span className="uppercase">{brand}</span>
          <span className="font-bold uppercase">{model}</span>
        </div>
        <div>
          <span>{year}</span>
        </div>
      </div>
    </div>
  )
}
