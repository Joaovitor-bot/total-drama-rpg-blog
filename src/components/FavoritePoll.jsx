import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { participantes } from "../data";
import { auth, db, provider } from "../firebase";

const POLL_ID = "favoritos-temporada-1";

function FavoritePoll() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loadingVote, setLoadingVote] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  const pollOptions = useMemo(() => {
    return participantes
      .filter((participante) => participante.status !== "Eliminado")
      .map((participante) => ({
        id: String(participante.id),
        name: participante.nome,
        image: participante.imagem,
      }));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const votesRef = collection(db, "polls", POLL_ID, "votes");

    const unsubscribe = onSnapshot(votesRef, (snapshot) => {
      const list = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setVotes(list);
    });

    return () => unsubscribe();
  }, []);

  const userVote = useMemo(() => {
    if (!user) return null;
    return votes.find((vote) => vote.userId === user.uid) || null;
  }, [votes, user]);

  useEffect(() => {
  if (userVote?.optionId) {
    setSelectedOption(userVote.optionId);
    return;
  }

  if (pollOptions.length > 0) {
    setSelectedOption((currentOption) => currentOption || pollOptions[0].id);
  }
  }, [userVote?.optionId, pollOptions]);

  const results = useMemo(() => {
    const countMap = {};

    pollOptions.forEach((option) => {
      countMap[option.id] = {
        ...option,
        votes: 0,
      };
    });

    votes.forEach((vote) => {
      if (countMap[vote.optionId]) {
        countMap[vote.optionId].votes += 1;
      }
    });

    return Object.values(countMap).sort((a, b) => b.votes - a.votes);
  }, [votes, pollOptions]);

  const totalVotes = votes.length;
  const displayedResults = showAllResults ? results : results.slice(0, 3);

  async function handleLogin() {
    if (loginLoading) return null;

    setLoginLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Erro ao entrar com Google:", error);

      if (
        error.code !== "auth/cancelled-popup-request" &&
        error.code !== "auth/popup-closed-by-user"
      ) {
        alert(`Erro ao entrar: ${error.code}`);
      }

      return null;
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleVote(event) {
    event.preventDefault();

    let currentUser = user;

    if (!currentUser) {
      currentUser = await handleLogin();

      if (!currentUser) return;
    }

    if (!selectedOption) {
      alert("Escolha um participante para votar.");
      return;
    }

    const option = pollOptions.find((item) => item.id === selectedOption);

    if (!option) {
      alert("Participante inválido.");
      return;
    }

    setLoadingVote(true);

    try {
      const voteRef = doc(db, "polls", POLL_ID, "votes", currentUser.uid);

      await setDoc(
        voteRef,
        {
          userId: currentUser.uid,
          userName: currentUser.displayName || "Usuário",
          userPhoto: currentUser.photoURL || "",
          optionId: option.id,
          optionName: option.name,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Erro ao votar:", error);
      alert(`Erro ao votar: ${error.code}`);
    } finally {
      setLoadingVote(false);
    }
  }

  return (
    <div className="panel favorite-poll favorite-poll-compact">
      <p className="eyebrow">Enquete</p>

      <h2>Quem é seu favorito?</h2>

      <p>
        Escolha seu participante favorito da temporada. Cada conta Google pode
        votar uma vez e atualizar o voto depois.
      </p>

      <form className="poll-form poll-form-compact" onSubmit={handleVote}>
        <label htmlFor="favorite-select">Escolha seu favorito</label>

        <select
          id="favorite-select"
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          {pollOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loadingVote || loginLoading}>
          {loadingVote
            ? "Salvando..."
            : loginLoading
              ? "Abrindo Google..."
              : userVote
                ? "Atualizar voto"
                : "Votar"}
        </button>
      </form>

      {userVote && (
        <div className="poll-current-vote">
          Seu voto atual: <strong>{userVote.optionName}</strong>
        </div>
      )}

      <div className="poll-results poll-results-compact">
        <div className="poll-results-header">
            <strong>{showAllResults ? "Resultado geral" : "Top favoritos"}</strong>
            <span>{totalVotes} voto(s)</span>
        </div>

        {displayedResults.map((result) => {
            const percentage =
            totalVotes === 0 ? 0 : Math.round((result.votes / totalVotes) * 100);

            return (
            <div className="poll-result-item" key={result.id}>
                <div className="poll-result-info">
                <span>{result.name}</span>

                <strong>
                    {result.votes} {result.votes === 1 ? "voto" : "votos"} • {percentage}%
                </strong>
                </div>

                <div className="poll-bar">
                <i style={{ width: `${percentage}%` }}></i>
                </div>
            </div>
            );
        })}

        {results.length > 3 && (
            <button
            type="button"
            className="poll-toggle-results"
            onClick={() => setShowAllResults((current) => !current)}
            >
            {showAllResults ? "Mostrar menos" : "Ver todos os participantes"}
            </button>
        )}
        </div>
    </div>
  );
}

export default FavoritePoll;