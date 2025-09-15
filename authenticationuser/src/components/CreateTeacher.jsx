import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const CreateTeacher = () => {
  const [formValue, setFormValue] = useState({
    id: null,
    name: "",
    description: "",
    img: null,
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("x-access-token");
      const res = await axiosInstance.get("api_stream/list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.streams || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormValue({ ...formValue, img: files[0] });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  //create/edit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("x-access-token");
      const formData = new FormData();
      formData.append("name", formValue.name);
      formData.append("description", formValue.description);
      if (formValue.img) formData.append("image", formValue.img);

      if (formValue.id) {

        await axiosInstance.put(
          `api_stream/edit/${formValue.id}/`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Update successful!");
      } else {

        await axiosInstance.post("api_stream/add/", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Create successful!");
      }


      setFormValue({ id: null, name: "", description: "", img: null });
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };


  const handleEditClick = (item) => {
    setFormValue({
      id: item.id,
      name: item.name,
      description: item.description,
      img: null,
    });

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{formValue.id ? "Edit Teacher" : "Create Teacher"}</h2>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formValue.description}
          onChange={handleChange}
          required
        />
        <br />

        <label>Image</label>
        <input type="file" name="img" accept="image/*" onChange={handleChange} />
        <br />

        <button type="submit">{formValue.id ? "Update" : "Create"}</button>
      </form>

      <hr />
      <h2>Teacher List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "20px" }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                width="200"
                style={{ borderRadius: "8px" }}
              />
            )}
            <button onClick={() => handleEditClick(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTeacher;


