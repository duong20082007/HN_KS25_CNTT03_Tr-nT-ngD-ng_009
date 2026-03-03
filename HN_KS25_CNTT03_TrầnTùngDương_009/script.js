let listSong = [
    { id: "S001", title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", duration: 233 },
    { id: "S002", title: "See You Again", artist: "Wiz Khalifa", genre: "Rap", duration: 230 },
    { id: "S003", title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", duration: 354 },
    { id: "S004", title: "Hotel California", artist: "Eagles", genre: "Rock", duration: 390 },
    { id: "S005", title: "Faded", artist: "Alan Walker", genre: "Electronic", duration: 212 },
    { id: "S006", title: "Cà Phê", artist: "MIN", genre: "Pop", duration: 240 }
];
const genres = ["Pop", "Rap", "Ballad", "Rock", "Electronic", "Indie"];



function addSong(id, title, artist, genre, duration) {
    const isIdExists = listSong.some(song => song.id === id);
    if (isIdExists) {
        console.log(`ID đã tồn tại, vui lòng chọn ID khác: "${id}"`);
        return;
    }

    const isSongExists = listSong.some(song =>
        song.title.toLowerCase() === title.toLowerCase() &&
        song.artist.toLowerCase() === artist.toLowerCase()
    );
    if (isSongExists) {
        console.log(`Bài hát này đã có trong playlist: "${title} - ${artist}"`);
        return;
    }

    if (!Number.isInteger(duration) || duration <= 0) {
        console.log(`Thời lượng phải là số nguyên và lớn hơn 0. Giá trị nhập: ${duration}`);
        return;
    }

    const isValidGenre = genres.includes(genre);
    if (!isValidGenre) {
        console.log(`Thể loại không hợp lệ. Phải là một trong các giá trị: '${genres.join("', '")}'. Giá trị nhập: "${genre}"`);
        return;
    }

    const newSong = { id, title, artist, genre, duration };
    listSong.push(newSong);
    console.log(`Đã thêm bài hát: "${title} - ${artist}" vào playlist!`);
}

let deleteSongByTitle = (title, isConfirmed) => {
    const indexToDelete = listSong.findIndex(song => song.title.toLowerCase() === title.toLowerCase());

    if (indexToDelete === -1) {
        console.log(`Bài hát "${title}" không có trong playlist.`);
        return;
    }

    if (isConfirmed) { 
        listSong.splice(indexToDelete, 1);
        console.log(`Đã xóa bài hát "${title}" thành công!`);
    } else { 
        console.log(`Đã hủy thao tác xóa bài hát "${title}".`);
    }
}

let displayPlaylist = () => {
    if (listSong.length === 0) {
        console.log("Playlist hiện đang trống.");
        return;
    }
    console.log(listSong);
}

let updateSongByTitle = (title, newDuration, newGenre) => {
    const songToUpdate = listSong.find(song => song.title.toLowerCase() === title.toLowerCase());

    if (!songToUpdate) {
        console.log(`Bài hát "${title}" không có trong playlist!`);
        return;
    }

    let isUpdateValid = true;
    let updatedFields = [];

    if (newDuration !== null && newDuration !== undefined) {
        if (!Number.isInteger(newDuration) || newDuration <= 0) {
            isUpdateValid = false;
            console.log(`Thời lượng phải là số nguyên và lớn hơn 0. Giá trị nhập: ${newDuration}`);
        } else {
            songToUpdate.duration = newDuration;
            updatedFields.push("Duration");
        }
    }

    if (newGenre !== null && newGenre !== undefined) {
        if (!genres.includes(newGenre)) {
            isUpdateValid = false;
            console.log(`Thể loại không hợp lệ. Phải là một trong các giá trị: '${genres.join("', '")}'. Giá trị nhập: "${newGenre}"`);
        } else {
            songToUpdate.genre = newGenre;
            updatedFields.push("Genre");
        }
    }

    if (isUpdateValid && updatedFields.length > 0) {
        console.log(`Đã cập nhật bài hát: "${songToUpdate.title} - ${songToUpdate.artist}" (${updatedFields.join(" và ")})`);
    } else if (isUpdateValid && updatedFields.length === 0) {
        console.log(`Bài hát "${title}" được tìm thấy, nhưng không có thông tin mới nào được chỉ định hoặc hợp lệ để cập nhật.`);
    }
}


let searchSong = (query, searchType) => {
    const normalizedQuery = query.toLowerCase();
    
    if (searchType === 'title') {
        const foundSong = favoritePlaylist.find(song => song.title.toLowerCase().includes(normalizedQuery));
        
        if (!foundSong) {
            console.log(`Không tìm thấy bài hát nào có tiêu đề "${query}".`);
        } else {
            console.log(`Bài hát tìm thấy: ${foundSong.title} - ${foundSong.artist}, Thể loại: ${foundSong.genre}, Thời lượng: ${foundSong.duration} giây`);
        }
    }
    
    else if (searchType === 'artist') {
        const foundSongs = listSong.filter(song => song.artist.toLowerCase().includes(normalizedQuery));
        
        if (foundSongs.length === 0) {
            console.log(`Không có bài hát nào của nghệ sĩ "${query}".`);
        } else {
            console.log(`Tìm thấy ${foundSongs.length} bài hát của nghệ sĩ "${query}":`);
            const results = foundSongs.map(song => ({
                Title: song.title,
                Artist: song.artist,
                Duration_s: song.duration
            }));
            console.table(results);
        }
    } else {
         console.log("Loại tìm kiếm không hợp lệ. Vui lòng chọn 'title' hoặc 'artist'.");
    }
}

let filterByGenre = (genre) => {
    
    if (!genres.includes(genre)) {
        console.log(`Thể loại không hợp lệ! Phải là một trong các giá trị: '${genres.join("', '")}'.`);
        return;
    }

    const filteredSongs = listSong.filter(song => song.genre === genre);

    if (filteredSongs.length === 0) {
        console.log(`Hiện tại playlist chưa có bài hát thể loại "${genre}".`);
    } else {
        console.log(`Danh sách ${filteredSongs.length} bài hát thể loại "${genre}":`);
        console.log(filteredSongs.map(song => ({
            Title: song.title,
            Artist: song.artist,
            Duration_s: song.duration
        })));
    }
}



let choice;
while(choice !== 0){
    choice = +prompt(`
        1. Khởi tạo playlist
        2. Thêm bài hát
        3. Xóa bài hát
        4. Hiển thị danh sách playlist
        5. Cập nhật thông tin bài hát
        6. Tìm bài hát
        7. Lọc bài hát theo thể loại
        8. Tính tổng thời lượng playlist 
        9. Sắp xếp playlist theo thời lượng
        10. Xác định trend nhạc 
        0. Thoát
        `);
    switch (choice) {
        case 1:
            
            break;
        case 2:
            addSong(listSong);
            break;
        case 3:
            deleteSongByTitle(listSong)
            break;
        case 4:
            displayPlaylist(listSong);
            break;
        case 5:
            updateSongByTitle(listSong);
            break;
        case 6:
            searchSong(listSong);
            break;
        case 7:
            filterByGenre(listSong)
            break;
        case 8:
            
            break;
        case 9:
            
            break;
        case 10:
            
            break;
        case 0:
            alert("Thoát");
            break;
        default:
            alert("Vui lòng nhập đúng định dạng");
            break;
    }
}
