import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AffRap } from "../SetRapport/SetRapportSlice";
import { ListDemandes } from "../GetListeDemande/DemandeInspectionSlice";
import "../FormCss.css";
const RapportFrom = ({ id, setid }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
  });
  const { titre, description } = formData;
  useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keyup", (e) => {
      textarea.style.height = "63px";
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const UserData = {
      demandeId: id,
      titre,
      description,
    };
    console.log(UserData);
    dispatch(AffRap(UserData)).then(() => {
      dispatch(ListDemandes());
      setid(null);
    });
  };
  return (
    <div className="Rapport">
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre" className="title">
          Titre:
        </label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={titre}
          onChange={onChange}
          required
        />

        <label htmlFor="description" className="title">
          Rapport:
        </label>
        <textarea
          className="wrapper"
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          required
        ></textarea>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RapportFrom;
