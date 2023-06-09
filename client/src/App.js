import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AgentLogin from "./espace_agents/agent_login/AgentLogin";
import AgentAdmin from "./espace_agents/agent_admin/AgentAdmin";
import AgentInspection from "./espace_agents/Agent_inspecteur/AgentInspection";
import AgentInstruction from "./espace_agents/agent_instructeur/AgentInstruction";
import NotFound from "./NotFound";
import Register from "./espace_agents/agent_admin/register/Register";
import Admin_Commssion from "./espace_agents/agent_admin/Commission/Admin_Commssion";
import Admin_Inspection from "./espace_agents/agent_admin/inspection/Admin_Inspection";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>welcome espace public</h1>} />

      <Route path="/espaceAgent">
        <Route path="login" element={<AgentLogin />} />
        <Route path="Admin" element={<AgentAdmin />} />
        <Route path="Admin/register" element={<Register />} />
        <Route path="Admin/Inspection" element={<Admin_Inspection />} />
        <Route path="Admin/Commission" element={<Admin_Commssion />} />

        <Route path="Inspection" element={<AgentInspection />} />
        <Route path="Instruction" element={<AgentInstruction />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
