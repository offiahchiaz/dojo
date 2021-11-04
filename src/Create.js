import { useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);
        
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="title">Blog title:</label>
                <input type="text" name="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />

                <label htmlFor="body">Blog body:</label>
                <textarea name="body" id="body" cols="30" rows="10"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required>

                 </textarea>

                <label htmlFor="author">Blog author:</label>
                <select value={author} 
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>

                { !isPending && <button>Add Blog</button> }
                { isPending && <button>Adding blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;