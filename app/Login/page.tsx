

export default async function Login(){
    return(
        <div className="w-full h-screen flex justify-center  bg-zinc-200">
            <div className="flex flex-col  items-center gap-4 text-2xls w-full">

                    <h1 className="bg-zinc-200 text-2xl text-zinc-600">Connexion/Inscription</h1>


                <div className="flex flex-col gap-10 bg-slate-200 rounded-lg p-3 w-4/12 shadow-xl">
                   <div className="flex flex-col gap-11 ">
                   <div className="flex  justify-around w-full"  >
                   <label htmlFor="login">Login</label><input type="text" name="login" id="login" />
                   </div >
                   <div className="flex  justify-around w-full">
                   <label htmlFor="mdp">Password </label><input type="password" name='mdp' id='mdp' />

                   </div>
                   </div>
                    <button className="bg-slate-700 text-zinc-200 rounded-lg shadow-lg hover:bg-zinc-500">Connexion</button>
                </div>
            </div>
        </div>
    )
}