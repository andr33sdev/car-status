
type CarCardProps = {
  id?: number,
  brand: string
  model: string,
  year: number,
  license_plate: string
}

export default function CarCard({ brand, model, year, license_plate }: CarCardProps) {

  return (
    <div className="bg-blue-pastel rounded-4xl shadow-md h-auto">
      <div className="flex flex-col px-8 py-6">
        <span className="font-bold text-xl text-dark-blue-night uppercase">{brand}</span>
        <span className="uppercase text-slate-500">{model} - {year}</span>
        <img className="h-[120px] m-6 object-center" src="./car-silhouette.png" alt={`${brand} ${model}`} />
      </div>
      <div className="bg-blue-pastel-600 font-bold text-right text-dark-blue-night px-8 py-4 rounded-b-4xl">
        {license_plate}
      </div>
    </div>
  );
}
