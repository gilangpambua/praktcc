import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Kucing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gambar, setGambar] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [desk, setDesk] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState("");
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/kucing");
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/deleteKucing/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Berhasil menghapus data, refresh data kucing
        setStatus(alert('Berhasil Menghapus Data Kucing'));
        fetchData();
      } else {
        setStatus(alert('Gagal Menghapus Data Kucing'));
        console.log("Gagal menghapus data kucing");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleTambah = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tambahKucing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gambar,
          nama,
          jenis,
          desk,
        }),
      });

      if (response.ok) {
        // Berhasil tambah data, refresh data kucing
        fetchData();
        setGambar("");
        setNama("");
        setJenis("");
        setDesk("");
        setStatus(alert('Berhasil Menambahkan Data Kucing'));
      } else {
        setStatus(alert('Gagal Menambahkan Data Kucing'));
        console.log("Gagal menambahkan data kucing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    // Mengaktifkan mode edit dengan ID yang dipilih
    setEditMode(true);
    setEditItemId(id);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/updateKucing/${editItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editItemId,
          gambar,
          nama,
          jenis,
          desk,
        }),
      });
  
      if (response.ok) {
        // Berhasil update data, refresh data kucing dan keluar dari mode edit
        fetchData();
        setEditMode(false);
        setEditItemId("");
        setGambar("");
        setNama("");
        setJenis("");
        setDesk("");
        setStatus(alert('Berhasil Mengupdate Data Kucing'));
      } else {
        setStatus(alert('Gagal Mengupdate Data Kucing'));
        console.log("Gagal mengupdate data kucing");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCancelEdit = () => {
    // Batal edit dan reset form
    setEditMode(false);
    setEditItemId("");
    setGambar("");
    setNama("");
    setJenis("");
    setDesk("");
  };

  const handleLogout = () => {
    setStatus(alert('Logout Berhasil'));
    navigate('/login');
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto">
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto">
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">
            {editMode ? "Edit Kucing" : "Tambah Kucing Baru"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gambar:
            </label>
            <input
              type="text"
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama:
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Jenis:
            </label>
            <input
              type="text"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deskripsi:
            </label>
            <textarea
              value={desk}
              onChange={(e) => setDesk(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div>
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleTambah}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Tambah
              </button>
            )}
          </div>
        </div>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto"
        >
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full h-64 object-cover"
          />
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{item.nama}</h2>
            <p className="text-gray-700 text-base mb-2">Jenis: {item.jenis}</p>
            <p className="text-gray-700 text-base">
              Deskripsi: {item.desk}
            </p>
            <button
              onClick={() => handleEdit(item.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Edit
            </button>
            <button
            onClick={() => handleDelete(item.id)}
            className="mx-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
            Delete
            </button>
          </div>
        </div>
      ))}

      <div className="container mx-auto">
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kucing;
