export default function footer(){
    return(
        <div className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs text-black">
        <p>
          Powered by{" "}
          <a
            href="https://huoshuiai.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            huoshui
          </a>
        </p>
      </div>
    )
}