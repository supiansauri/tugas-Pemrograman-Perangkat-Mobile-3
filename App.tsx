import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';

interface toDo {
  id: number;
  title: string;
  statue: boolean;
}

const App = () => {
  const [title, setTitle] = useState<string>(''); // Input baru untuk menambah to-do
  const [toDo, setToDo] = useState<toDo[]>([]); // Daftar to-do
  const [editId, setEditId] = useState<number | null>(null); // Id item yang sedang diedit
  const [editTitle, setEditTitle] = useState<string>(''); // Input baru untuk edit to-do

  // Fungsi untuk menambah to-do
  const handleAdd = () => {
    if (title.trim() === '') {
      return;
    }

    const newToDo = {
      id: Date.now(),
      title: title,
      statue: false,
    };

    setToDo(prev => [...prev, newToDo]);
    setTitle('');
  };

  // Fungsi untuk menghapus to-do
  const handleDelete = (deleteId: number) => {
    const updatedToDo = toDo.filter(item => item.id !== deleteId);
    setToDo(updatedToDo);
  };

  // Fungsi untuk memulai proses edit
  const handleStartEdit = (id: number, currentTitle: string) => {
    setEditId(id); // Set ID dari to-do yang sedang diedit
    setEditTitle(currentTitle); // Set judul dari to-do yang ingin diedit
  };

  // Fungsi untuk menyimpan hasil edit to-do
  const handleEdit = () => {
    if (editTitle.trim() === '') {
      return;
    }

    setToDo(prev =>
      prev.map(item =>
        item.id === editId ? { ...item, title: editTitle } : item,
      ),
    );
    setEditId(null); // Set kembali editId menjadi null setelah selesai mengedit
    setEditTitle(''); // Reset editTitle setelah mengedit
  };

  return (
    <View style={style.container}>
      <View style={style.row}>
        <TextInput
          style={style.input}
          placeholder="Tambah to-do"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable style={style.button} onPress={handleAdd}>
          <Text style={style.texts}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={toDo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.flex}>
            <View style={[style.row, style.bt]}>
              {editId === item.id ? (
                // Jika sedang dalam mode edit, tampilkan input untuk edit
                <TextInput
                  style={style.input}
                  value={editTitle}
                  onChangeText={setEditTitle}
                />
              ) : (
                // Jika tidak dalam mode edit, tampilkan teks biasa
                <Text style={style.texts}>{item.title}</Text>
              )}

              <View style={style.row}>
                {editId === item.id ? (
                  // Jika sedang dalam mode edit, tampilkan tombol "Save"
                  <Pressable style={buttonRadius('green').buttonRad} onPress={handleEdit}>
                    <Text style={style.texts}>Save</Text>
                  </Pressable>
                ) : (
                  // Jika tidak dalam mode edit, tampilkan tombol "Edit"
                  <Pressable
                    style={buttonRadius('blue').buttonRad}
                    onPress={() => handleStartEdit(item.id, item.title)}
                  >
                    <Text style={style.texts}>Edit</Text>
                  </Pressable>
                )}

                <Pressable
                  style={buttonRadius('red').buttonRad}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={style.texts}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
  },
  texts: {
    color: 'black',
    fontSize: 18,
  },
  input: {
    borderColor: 'black',
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  bt: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

const buttonRadius = (color: any) =>
  StyleSheet.create({
    buttonRad: {
      padding: 10,
      backgroundColor: color,
      borderRadius: 12,
      marginHorizontal: 5,
    },
  });

export default App;