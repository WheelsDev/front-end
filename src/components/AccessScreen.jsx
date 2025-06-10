import { useState, useEffect } from "react";
import "../css/AccessScreen.css";
import imagem3 from "../assets/logobike.png";

function AccessScreen({ onLoginSuccess }) {
  const [acesso, setAcesso] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [logoInCard, setLogoInCard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (email.trim() !== "" && password.trim() !== "" && validateEmail(email)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    if (loginError) {
      setLoginError(false);
    }
  }, [email, password]);

  const handleAccess = () => {
    setAnimating(true);
    setLogoVisible(false);

    setTimeout(() => {
      setAcesso(true);
      setAnimating(false);
      setLogoInCard(true);
    }, 1000);
  };

  const handleLogin = async () => {
    setLoading(true);
    setLoginError(false);
    try {
      const response = await fetch(
        `http://localhost:8080/api/usuarios/autenticação?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`
      );
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const user = await response.json();
      if (user && user.email) {
        localStorage.setItem("userType", user.tipo);
        localStorage.setItem("userEmail", user.email);
        onLoginSuccess();
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`AccessScreen ${isFormValid ? 'valid' : ''}`}>
      <div className="esfera1"></div>
      <p className="title">Sistema Wheels</p>
      <p className="copyright">@2025 - Copyright RTGJ</p>

      <div className="accessarea">
        {logoVisible && !acesso && (
          <img className="logobike" src={imagem3} alt="logo" title="logo" />
        )}

        {acesso ? (
          <div className="card-login">
            <div
              className={`login-header ${
                loginError ? "error" : isFormValid ? "valid" : ""
              }`}
            ></div>
            <div className="paiContainer">
              {logoInCard && (
                <img
                  className="logobike-in-card logo-fade-in"
                  src={imagem3}
                  alt="logo"
                  title="logo"
                />
              )}
              <h3>Informe seu E-mail e senha</h3>
              <input
                type="email"
                placeholder="E-mail"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`botao-login ${loginError ? "error" : isFormValid ? "valid" : ""}`}
                onClick={handleLogin}
                disabled={!isFormValid || loading}
              >
                {loading ? "Entrando..." : "Login"}
              </button>
            </div>
            <div
              className={`login-footer ${
                loginError ? "error" : isFormValid ? "valid" : ""
              }`}
            ></div>
          </div>
        ) : (
          <button
            className={`botao1 ${animating ? "animating" : ""}`}
            onClick={handleAccess}
            disabled={animating}
          >
            <span className={`botao-text ${animating ? "fade-out" : ""}`}>
              Acessar Sistema
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

export default AccessScreen;
