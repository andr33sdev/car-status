import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { VehicleContext } from "../context/VehiclesContext";

const token = localStorage.getItem('token');

export default function UpdateDocuments() {
  const { id } = useParams();
  const { dispatch } = useContext(VehicleContext);

  const [documents, setDocuments] = useState({
    fireExtinguisherDate: "",
    vtvDate: "",
    insuranceDate: "",
    licensePlateDate: ""
  });

  // 1. Obtener documentos desde la API al cargar el componente
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`https://car-status.up.railway.app/api/vehicle-documents/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Verifica si la respuesta es correcta
        if (response.ok) {
          console.log("Datos recibidos:", data); // Verifica que los datos sean correctos

          setDocuments({
            fireExtinguisherDate: data.fire_extinguisher_expiry || "",
            vtvDate: data.vtv_expiry || "",
            insuranceDate: data.insurance_expiry || "",
            licensePlateDate: data.license_plate_expiry || ""
          });
        }
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };

    if (id) {
      fetchDocuments();
    }
  }, [id]);

  // 2. Manejar cambios en los inputs sin modificar el estado global
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocuments({ ...documents, [e.target.name]: e.target.value });
  };

  // 3. Enviar los datos actualizados a la API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mostrar los datos antes de enviarlos
    console.log("Datos enviados:", documents);

    try {
      const response = await fetch("https://car-status.up.railway.app/api/vehicle-documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "vehicle_id": id,
          "fire_extinguisher_expiry": documents.fireExtinguisherDate,
          "vtv_expiry": documents.vtvDate,
          "insurance_expiry": documents.insuranceDate,
          "license_plate_expiry": documents.licensePlateDate,
        }),
      });

      const data = await response.json();

      // Mostrar la respuesta del servidor
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        dispatch({ type: 'CREATE_DOCUMENTS', payload: { documents: data } });

        // Actualiza el estado con los nuevos valores
        setDocuments({
          fireExtinguisherDate: data.fire_extinguisher_expiry,
          vtvDate: data.vtv_expiry,
          insuranceDate: data.insurance_expiry,
          licensePlateDate: data.license_plate_expiry,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="fire-extinguisher">Vencimiento del matafuegos</label>
        <input
          id="fire-extinguisher"
          name="fireExtinguisherDate"
          type="date"
          value={documents.fireExtinguisherDate}
          onChange={handleChange}
          className="p-2 bg-gray-50 rounded-lg border-slate-500 border-2"
        />

        <label htmlFor="vtv">Vencimiento de la VTV</label>
        <input
          id="vtv"
          name="vtvDate"
          type="date"
          value={documents.vtvDate}
          onChange={handleChange}
          className="p-2 bg-gray-50 rounded-lg border-slate-500 border-2"
        />

        <label htmlFor="insurance">Vencimiento del seguro</label>
        <input
          id="insurance"
          name="insuranceDate"
          type="date"
          value={documents.insuranceDate}
          onChange={handleChange}
          className="p-2 bg-gray-50 rounded-lg border-slate-500 border-2"
        />

        <label htmlFor="license-plate">Vencimiento de la patente</label>
        <input
          id="license-plate"
          name="licensePlateDate"
          type="date"
          value={documents.licensePlateDate}
          onChange={handleChange}
          className="p-2 bg-gray-50 rounded-lg border-slate-500 border-2"
        />

        <input type="submit" value="Actualizar" className="bg-slate-500 hover:bg-slate-400 text-white font-bold uppercase rounded-lg p-2" />
      </form>
    </div>
  );
}
