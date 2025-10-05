import classes from "./ConversationsMainConversations.module.css";
import { Mention } from "primereact/mention";
import { useEffect, useRef, useState } from "react";
import { customerService } from "../../Utilities/dummyData";
import Button from "../../Components/Button/Button";
import { AtSign, Plus, Send, X } from "lucide-react";
import ProjectChatMessages from "../ProjectChatMessages/ProjectChatMessages";

const ConversationsMainConversations = () => {
  // States
  const [value, setValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [quoteMessage, setQuoteMessage] = useState<string | null>(null);

  //   ref
  const inputRef = useRef<Mention>(null);

  // Effects
  useEffect(() => {
    let data = customerService.getData();
    const userData = data.map((d: any) => ({
      ...d,
      nickname: `${d.name.replace(/\s+/g, "").toLowerCase()}_${d.id}`,
    }));
    setCustomers(userData as any);
  }, []);

  const onSearch = (event: any) => {
    setTimeout(() => {
      const query = event.query;
      let suggestions;

      if (!query.trim().length) {
        suggestions = [...customers];
      } else {
        suggestions = customers.filter((customer: any) => {
          return customer.nickname
            .toLowerCase()
            .startsWith(query.toLowerCase());
        });
      }

      setSuggestions(suggestions);
    }, 250);
  };

  const itemTemplate = (suggestion: any) => {
    const src =
      "https://primefaces.org/cdn/primereact/images/avatar/" +
      suggestion.representative.image;

    return (
      <div className={classes.suggestionsContainer}>
        <img alt={suggestion.name} src={src} width="32" />
        <span className={classes.suggestionName}>{suggestion.name}</span>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <ProjectChatMessages setQuotedMessage={setQuoteMessage} />
      <div className={classes.message}>
        <div>
          {quoteMessage && (
            <div className={classes.quote}>
              <span>{quoteMessage}</span>
              <Button type="tertiary" onClick={() => setQuoteMessage(null)}>
                <X size={12} />
              </Button>
            </div>
          )}

          <Mention
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            suggestions={suggestions}
            onSearch={onSearch}
            field="nickname"
            placeholder="Type a message"
            rows={3}
            cols={60}
            itemTemplate={itemTemplate}
            className={classes.mention}
            ref={inputRef}
            autoFocus
            // autoResize causes load error
          />

          <div className={classes.actions}>
            <Button type="tertiary">
              <Plus size={16} strokeWidth={2} color="#a1a1a1" />
            </Button>

            <Button
              type="tertiary"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current?.focus();
                  setValue((prevState) => `${prevState}@`);
                }
              }}
            >
              <AtSign size={16} strokeWidth={2} color="#a1a1a1" />
            </Button>

            <Button>
              <Send size={16} strokeWidth={2} color="#fff" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationsMainConversations;
