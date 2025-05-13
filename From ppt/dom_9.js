function tambah() {
    let p= document.createElement("p");
    p.innerText = "Ini paragraf yang akan dihapus";
    p.id = "hapusSaya";
    document.getElementById("container").appendChild(p);
}

function hapus() {
    let container = document.getElementById("container");
    let target = document.getElementById("hapusSaya");
    if (target) {
        container.removeChild(target);
    } else {
        alert("Paragraf belum ada atau sudah dihapus.");
    }
}