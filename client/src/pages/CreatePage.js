import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/http.hook'
import AuthContext from "../context/AuthContext";

const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState('')

  const clickHandler = async() => {
    try {
      const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` })
      history.push(`/detail/${data.link._id}`)
    } catch (e) {}
  }

  const pressHandler = async(event) => {                            // yes, I know about DRY!!! SORRY!!!!
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      try {
        const data = await request("/api/link/generate", "POST", { from: link }, { Authorization: `Bearer ${auth.token}` });
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <button
            className="btn orange darken-3"
            style={{ marginRight: 10 }}
            disabled={loading}
            onClick={clickHandler}
          >
            Сократить
          </button>
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};


export default CreatePage