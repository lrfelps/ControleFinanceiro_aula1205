const db = new PouchDB('Finances');
const form = document.getElementById('RecordForm');
const list = document.getElementById('RecordsList');
const totalDaily = document.getElementById('DailySum');
const total = document.getElementById('TotalSum');
const today = new Date().toISOString().slice(0, 10);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const desc = document.getElementById('Description').value;
    const value = document.getElementById('Value').value;
    const recordType = document.getElementById('Type').value;
    const date = today;

    const doc = {
        _id: new Date().toISOString(),
        desc, value, recordType, date
    };

    await db.put(doc);
    form.reset();
    refresh();
});


async function refresh() {
    const res = await db.allDocs({include_docs: true, descending: true});
    list.innerHTML = '';
    let totalD = 0;
    let totalG = 0;

    res.rows.forEach(row => {
        const { desc, value, recordType, date} = row.doc;
        const li = document.createElement('li');
        li.textContent = `${date} - ${desc} : R$ ${value.toFixed(2)} - (${recordType})`;
        list.appendChild(li);
    }
    )

}

refresh();