let amens = [];
function updateAmens () {
  amens = [];
  $('INPUT:checked').each((x) => amens.append(x.data-id));
}
window.addEventListener('DOMContentLoaded', function () {
  $('INPUT').click(updateAmens);
});
