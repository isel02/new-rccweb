import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

const API_BASE = "https://www.rcccabling.com.ph/api";

interface Service {
  id?: number;
  title: string;
  description: string;
  image: string;
}

interface Project {
  id?: number;
  title: string;
  details: string;
  image: string;
}

interface Partner {
  id?: number;
  name: string;
  image: string;
}

interface Career {
  id?: number;
  job_title: string;
  description: string;
}

interface CompanyInfo {
  id?: number;
  year_exp: string;
  completed_proj: string;
  ave_rate: string;
  served: string;
  email: string;
  phone: string;
  facebook: string;
  office_hrs: string;
  address: string;
  map: string;
  company_img: string;
  about_desc: string;
  vision: string;
  mission: string;
  goal: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchData = async (table: string) => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/${table}.php`);
    const data = await res.json();
    if (table === "services") setServices(data);
    if (table === "projects") setProjects(data);
    if (table === "partners") setPartners(data);
    if (table === "careers") setCareers(data);
    if (table === "company_info") setCompanyInfo(data[0] || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload.php`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.filename;
  };

  const addItem = async (table: string, body: any) => {
    await fetch(`${API_BASE}/${table}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", ...body }),
    });
    fetchData(table);
  };

  const editItem = async (table: string, id: number, body: any) => {
    await fetch(`${API_BASE}/${table}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", id, ...body }),
    });
    setEditing(null);
    fetchData(table);
  };

  const deleteItem = async (table: string, id: number) => {
    await fetch(`${API_BASE}/${table}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    fetchData(table);
  };

  const renderTable = (table: string, data: any[], fields: string[]) => (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>
        {table.charAt(0).toUpperCase() + table.slice(1)}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <div className={styles.emptyState}>No {table} entries yet.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {fields.map((f) => (
                <th key={f}>{f}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {fields.map((f) => (
                  <td key={f}>
                    {f === "image" || f === "company_img" ? (
                      <img
                        src={row[f]}
                        alt=""
                        className={styles.thumbnail}
                      />
                    ) : (
                      row[f]
                    )}
                  </td>
                ))}
                <td>
                  <div className={styles.actions}>
                    <button
                      onClick={() => setEditing({ table, item: row })}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(table, row.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {table !== "company_info" && (
        <AddForm
          table={table}
          fields={fields}
          onSubmit={async (body, file) => {
            if (file) {
              const uploaded = await uploadFile(file);
              body.image = uploaded;
            }
            addItem(table, body);
          }}
        />
      )}
    </div>
  );

  const renderCompanyInfo = () => (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Company Information</h2>

      {loading ? (
        <p>Loading...</p>
      ) : !companyInfo ? (
        <div className={styles.emptyState}>
          <p>No company information set yet.</p>
          <button
            onClick={() => setEditing({ table: "company_info", item: {} })}
            className={styles.addBtn}
          >
            Add Company Info
          </button>
        </div>
      ) : (
        <div className={styles.companyInfoView}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Years of Experience:</strong> {companyInfo.year_exp}
            </div>
            <div className={styles.infoItem}>
              <strong>Completed Projects:</strong> {companyInfo.completed_proj}
            </div>
            <div className={styles.infoItem}>
              <strong>Average Rate:</strong> {companyInfo.ave_rate}
            </div>
            <div className={styles.infoItem}>
              <strong>Clients Served:</strong> {companyInfo.served}
            </div>
            <div className={styles.infoItem}>
              <strong>Email:</strong> {companyInfo.email}
            </div>
            <div className={styles.infoItem}>
              <strong>Phone:</strong> {companyInfo.phone}
            </div>
            <div className={styles.infoItem}>
              <strong>Facebook:</strong> {companyInfo.facebook}
            </div>
            <div className={styles.infoItem}>
              <strong>Office Hours:</strong> {companyInfo.office_hrs}
            </div>
            <div className={styles.infoItem}>
              <strong>Address:</strong> {companyInfo.address}
            </div>
            <div className={styles.infoItem}>
              <strong>Map Link:</strong> {companyInfo.map}
            </div>
            {companyInfo.company_img && (
              <div className={styles.infoItem}>
                <strong>Company Image:</strong>
                <img src={companyInfo.company_img} alt="Company" className={styles.thumbnail} />
              </div>
            )}
            <div className={styles.infoItem}>
              <strong>About:</strong> {companyInfo.about_desc}
            </div>
            <div className={styles.infoItem}>
              <strong>Vision:</strong> {companyInfo.vision}
            </div>
            <div className={styles.infoItem}>
              <strong>Mission:</strong> {companyInfo.mission}
            </div>
            <div className={styles.infoItem}>
              <strong>Goal:</strong> {companyInfo.goal}
            </div>
          </div>
          <button
            onClick={() => setEditing({ table: "company_info", item: companyInfo })}
            className={styles.editBtn}
          >
            Edit Company Info
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div className={styles.tabs}>
        {["company_info", "services", "projects", "partners", "careers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tabBtn} ${
              activeTab === tab ? styles.tabBtnActive : ""
            }`}
          >
            {tab === "company_info" ? "Company Info" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {editing && (
        <EditForm
          table={editing.table}
          item={editing.item}
          onSubmit={async (body, file) => {
            if (file) {
              const uploaded = await uploadFile(file);
              if (editing.table === "company_info") {
                body.company_img = uploaded;
              } else {
                body.image = uploaded;
              }
            }
            if (editing.item.id) {
              editItem(editing.table, editing.item.id, body);
            } else {
              addItem(editing.table, body);
            }
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {activeTab === "company_info" && renderCompanyInfo()}

      {activeTab === "services" &&
        renderTable("services", services, ["id", "title", "description", "image"])}

      {activeTab === "projects" &&
        renderTable("projects", projects, ["id", "title", "details", "image"])}

      {activeTab === "partners" &&
        renderTable("partners", partners, ["id", "name", "image"])}

      {activeTab === "careers" &&
        renderTable("careers", careers, ["id", "job_title", "description"])}
    </div>
  );
};

interface AddFormProps {
  table: string;
  fields: string[];
  onSubmit: (body: any, file?: File | null) => void;
}

const AddForm: React.FC<AddFormProps> = ({ table, fields, onSubmit }) => {
  const [form, setForm] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setForm({ ...form, image: URL.createObjectURL(selected) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, file);
    setForm({});
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>
        Add New {table.charAt(0).toUpperCase() + table.slice(1)}
      </h3>

      {fields
        .filter((f) => f !== "id")
        .map((f) => (
          <div key={f} className={styles.formGroup}>
            <label className={styles.label}>{f}</label>
            {f === "description" || f === "details" ? (
              <textarea
                name={f}
                value={form[f] || ""}
                onChange={handleChange}
                className={styles.textarea}
              />
            ) : f === "image" ? (
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className={styles.input}
              />
            ) : (
              <input
                type="text"
                name={f}
                value={form[f] || ""}
                onChange={handleChange}
                className={styles.input}
              />
            )}
          </div>
        ))}
      <button className={styles.addBtn}>Add</button>
    </form>
  );
};

interface EditFormProps {
  table: string;
  item: any;
  onSubmit: (body: any, file?: File | null) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ table, item, onSubmit, onCancel }) => {
  const [form, setForm] = useState<any>(item);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, file);
  };

  return (
    <div className={styles.editModal}>
      <div className={styles.editBox}>
        <h3 className={styles.formTitle}>Edit {table}</h3>
        <form onSubmit={handleSubmit}>
          {Object.keys(form)
            .filter((f) => f !== "id")
            .map((f) => (
              <div key={f} className={styles.formGroup}>
                <label className={styles.label}>{f.replace(/_/g, ' ')}</label>
                {f === "description" || f === "details" || f === "about_desc" || f === "vision" || f === "mission" || f === "goal" ? (
                  <textarea
                    name={f}
                    value={form[f] || ""}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                ) : f === "image" || f === "company_img" ? (
                  <>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                      className={styles.input}
                    />
                    {form[f] && (
                      <img
                        src={form[f]}
                        alt="Preview"
                        className={styles.thumbnail}
                      />
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    name={f}
                    value={form[f] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </div>
            ))}
          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;