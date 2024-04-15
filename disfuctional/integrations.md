<script>
async function includeHTML() {
  const response = await fetch('https://moose-on-road.github.io/integrations.html');
  if (response.ok) { // If HTTP-status is 200-299
    const html = await response.text();
    document.head.innerHTML += html;
  } else {
    console.error("Error loading the include file");
  }
}
includeHTML();
</script>