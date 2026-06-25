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

function getVoteOptionIds(vote) {
  if (Array.isArray(vote.optionIds)) {
    return vote.optionIds.map(String);
  }

  if (vote.optionId) {
    return [String(vote.optionId)];
  }

  return [];
}

function FavoritePoll() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    if (userVote) {
      setSelectedOptions(getVoteOptionIds(userVote));
    }
  }, [userVote]);

  const results = useMemo(() => {
    const countMap = {};

    pollOptions.forEach((option) => {
      countMap[option.id] = {
        ...option,
        votes: 0,
      };
    });

    votes.forEach((vote) => {
      const optionIds = getVoteOptionIds(vote);

      optionIds.forEach((optionId) => {
        if (countMap[optionId]) {
          countMap[optionId].votes += 1;
        }
      });
    });

    return Object.values(countMap).sort((a, b) => b.votes - a.votes);
  }, [votes, pollOptions]);

  const totalVotes = results.reduce((total, option) => total + option.votes, 0);
  const displayedResults = showAllResults ? results : results.slice(0, 5);

  function toggleOption(optionId) {
    setSelectedOptions((currentOptions) => {
      if (currentOptions.includes(optionId)) {
        return currentOptions.filter((id) => id !== optionId);
      }

      return [...currentOptions, optionId];
    });
  }

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

    if (selectedOptions.length === 0) {
      alert("Escolha pelo menos um participante para votar.");
      return;
    }

    const selectedNames = pollOptions
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.name);

    setLoadingVote(true);

    try {
      const voteRef = doc(db, "polls", POLL_ID, "votes", currentUser.uid);

      await setDoc(voteRef, {
        userId: currentUser.uid,
        userName: currentUser.displayName || "Usuário",
        userPhoto: currentUser.photoURL || "",
        optionIds: selectedOptions,
        optionNames: selectedNames,
        updatedAt: serverTimestamp(),
      });
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

      <h2>Quem são seus favoritos?</h2>

      <p>
        Escolha quantos participantes quiser. Pode atualizar
        seus favoritos depois.
      </p>

      <form className="poll-form poll-form-compact" onSubmit={handleVote}>
        <div className="poll-options-header">
          <span>Selecione seus favoritos</span>
          <strong>{selectedOptions.length} selecionado(s)</strong>
        </div>

        <div className="poll-options-list">
          {pollOptions.map((option) => {
            const checked = selectedOptions.includes(option.id);

            return (
              <label
                className={`poll-option-card ${checked ? "selected" : ""}`}
                key={option.id}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleOption(option.id)}
                />

                <span>{option.name}</span>
              </label>
            );
          })}
        </div>

        <button type="submit" disabled={loadingVote || loginLoading}>
          {loadingVote
            ? "Salvando..."
            : loginLoading
              ? "Abrindo Google..."
              : userVote
                ? "Atualizar favoritos"
                : "Votar"}
        </button>
      </form>

      {userVote && (
        <div className="poll-current-vote">
          Seus favoritos atuais:{" "}
          <strong>
            {getVoteOptionIds(userVote).length} participante(s)
          </strong>
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
                  {result.votes} {result.votes === 1 ? "voto" : "votos"} •{" "}
                  {percentage}%
                </strong>
              </div>

              <div className="poll-bar">
                <i style={{ width: `${percentage}%` }}></i>
              </div>
            </div>
          );
        })}

        {results.length > 5 && (
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