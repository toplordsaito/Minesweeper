import api from "./baseAPI";
export function getLeaderboard() {
  return api
    .get("user/leaderboard")
    .then((res) => res.data)
    .catch((err) => err);
}

export function getUserById(id) {
  return api
    .get("user/" + id)
    .then((res) => res.data)
    .catch((err) => err);
}

export function eloRanking(player1, player2, score1, score2) {
  return api
    .get("user/" + player1 + "/" + player2 + "/" + score1 + "/" + score2)
    .then((res) => res.data)
    .catch((err) => err);
}

export function CreateOrUpdate(profile) {
  return api
    .post("user/", profile)
    .then((res) => {console.log(res);return res.data})
    .catch((err) => {console.log(err.message);return err});
}
