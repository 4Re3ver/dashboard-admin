
let data = [
    { id: 1, nama: "Arifa", nim: 2412345678, prodi: "Teknologi Informasi" },
    { id: 2, nama: "Fitra", nim: 2412345679, prodi: "Arsitektur" },
    { id: 3, nama: "Salima", nim: 2412345680, prodi: "Bioteknologi" }
];

let deleteId = null;

// Tampil data
function renderTable() {
    const tbody = document.getElementById("tableBody");
    const emptyState = document.getElementById("emptyState");
    tbody.innerHTML = "";

    if (data.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
        
        data.forEach((item, index) => {
            tbody.innerHTML += `
                <tr>
                    <td><span class="badge bg-primary id-badge">${item.id}</span></td>
                    <td><strong>${item.nama}</strong></td>
                    <td>${item.nim}</td>
                    <td><span class="badge bg-info prodi-badge">${item.prodi}</span></td>
                    <td>
                        <button type="button" class="btn btn-icon btn-edit" onclick="openEdit(${item.id})" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" class="btn btn-icon btn-delete" onclick="openDelete(${item.id})" title="Hapus">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    
    updateHeaderStats();
}

function updateHeaderStats() {
    document.getElementById("totalCount").textContent = data.length;
    
    const studyPrograms = new Set(data.map(item => item.prodi));
    document.getElementById("studyPrograms").textContent = studyPrograms.size;
}

renderTable();



$("#formInput").on("submit", function(e) {
    e.preventDefault();

    const nama = $("#nama").val();
    const nim = $("#nim").val();
    const prodi = $("#prodi").val();

    const idBaru = data.length ? data[data.length - 1].id + 1 : 1;

    data.push({ id: idBaru, nama, nim, prodi });

    renderTable();
    this.reset();
});



function openEdit(id) {
    const item = data.find(d => d.id === id);

    document.getElementById("editId").value = item.id;
    document.getElementById("editNama").value = item.nama;
    document.getElementById("editNim").value = item.nim;
    document.getElementById("editProdi").value = item.prodi;

    new bootstrap.Modal(document.getElementById("editModal")).show();
}


$("#btnUpdate").on("click", function() {
    const id = parseInt($("#editId").val());
    const item = data.find(d => d.id === id);

    item.nama = $("#editNama").val();
    item.nim = $("#editNim").val();
    item.prodi = $("#editProdi").val();

    renderTable();
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});



function openDelete(id) {
    deleteId = id;
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}


$("#btnDeleteConfirm").on("click", function() {
    data = data.filter(item => item.id !== deleteId);
    renderTable();

    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
});



$(document).ready(function() {
    const $sidebar = $("#sidebar");
    const $main = $(".main");
    const $openSidebarBtn = $("#openSidebarBtn");
    const $toggleSidebarBtn = $("#toggleSidebar");

    
    $openSidebarBtn.on("click", function(e) {
        e.stopPropagation();
        const isDesktop = $(window).width() > 768;
        
        if (isDesktop) {
            
            $sidebar.toggleClass("hide");
            $main.toggleClass("collapsed");
        } else {
            
            $sidebar.toggleClass("show");
        }
    });

    
    $toggleSidebarBtn.on("click", function(e) {
        e.stopPropagation();
        const isDesktop = $(window).width() > 768;
        
        if (isDesktop) {
            $sidebar.addClass("hide");
            $main.addClass("collapsed");
        } else {
            $sidebar.removeClass("show");
        }
    });

    
    $(document).on("click", function(event) {
        if ($(window).width() <= 768) {
            if (!$sidebar.is(event.target) && !$sidebar.has(event.target).length && 
                !$openSidebarBtn.is(event.target) && !$openSidebarBtn.has(event.target).length) {
                $sidebar.removeClass("show");
            }
        }
    });

    
    $(window).on("resize", function() {
        $sidebar.removeClass("show");
        if ($(window).width() > 768) {
            $sidebar.removeClass("hide");
            $main.removeClass("collapsed");
        }
    });
});
