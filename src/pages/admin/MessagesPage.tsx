import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Mail, Trash2, Search, Calendar, User, Building, Briefcase, Eye } from "lucide-react";
import { toast } from "sonner";

export default function MessagesPage() {
  const messages = useQuery(api.cms.listContactMessages);
  const deleteMessage = useMutation(api.cms.deleteContactMessage);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const filteredMessages = messages?.filter(msg => {
    const search = searchTerm.toLowerCase();
    return (
      msg.name.toLowerCase().includes(search) ||
      msg.email.toLowerCase().includes(search) ||
      (msg.company && msg.company.toLowerCase().includes(search)) ||
      (msg.service && msg.service.toLowerCase().includes(search)) ||
      msg.message.toLowerCase().includes(search)
    );
  }) || [];

  const handleDelete = async (id: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await deleteMessage({ id });
      toast.success("Message deleted successfully");
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1B2D]">Contact Messages</h1>
          <p className="text-sm text-[#8B8178] mt-1">View and manage incoming inquiries from your website contact form.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white border border-[#E8E2DA] px-4 py-2.5 max-w-md">
        <Search className="h-4 w-4 text-[#8B8178]" />
        <input
          type="text"
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm w-full outline-none text-[#1A1A1A] placeholder-[#8B8178]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-white border border-[#E8E2DA] overflow-hidden flex flex-col h-[600px]">
          <div className="overflow-y-auto flex-1">
            {messages === undefined ? (
              <div className="flex items-center justify-center h-full text-[#8B8178]">
                Loading inquiries...
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Mail className="h-8 w-8 text-[#8B8178]/40 mb-3" />
                <p className="text-[#8B8178] text-sm">No messages found.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E2DA]">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 hover:bg-[#FAF6F1] cursor-pointer transition-colors text-left flex justify-between gap-4 ${
                      selectedMessage?._id === msg._id ? "bg-[#FAF6F1]" : ""
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#0F1B2D] truncate">{msg.name}</span>
                        <span className="text-xs text-[#8B8178]">({msg.email})</span>
                      </div>
                      {msg.service && (
                        <div className="text-xs text-primary font-medium">{msg.service}</div>
                      )}
                      <p className="text-xs text-[#8B8178] truncate max-w-md">{msg.message}</p>
                      <div className="text-[10px] text-[#8B8178] flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(msg.createdAt)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(msg._id, e)}
                      className="text-red-400 hover:text-red-600 self-center p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details Reading Pane */}
        <div className="bg-white border border-[#E8E2DA] p-6 h-[600px] flex flex-col">
          {selectedMessage ? (
            <div className="space-y-6 flex-1 flex flex-col text-left overflow-y-auto">
              <div>
                <h2 className="text-lg font-bold text-[#0F1B2D] border-b border-[#E8E2DA] pb-3 mb-4">Inquiry Details</h2>
                
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-[#8B8178] mt-0.5" />
                    <div>
                      <div className="text-xs text-[#8B8178]">From</div>
                      <div className="text-sm font-semibold text-[#0F1B2D]">{selectedMessage.name}</div>
                      <a href={`mailto:${selectedMessage.email}`} className="text-xs text-primary hover:underline">{selectedMessage.email}</a>
                    </div>
                  </div>

                  {selectedMessage.company && (
                    <div className="flex items-start gap-3">
                      <Building className="h-4 w-4 text-[#8B8178] mt-0.5" />
                      <div>
                        <div className="text-xs text-[#8B8178]">Company</div>
                        <div className="text-sm font-medium text-[#0F1B2D]">{selectedMessage.company}</div>
                      </div>
                    </div>
                  )}

                  {selectedMessage.service && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-4 w-4 text-[#8B8178] mt-0.5" />
                      <div>
                        <div className="text-xs text-[#8B8178]">Interested Service</div>
                        <div className="text-sm font-medium text-[#0F1B2D]">{selectedMessage.service}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-[#8B8178] mt-0.5" />
                    <div>
                      <div className="text-xs text-[#8B8178]">Received</div>
                      <div className="text-sm text-[#0F1B2D]">{formatDate(selectedMessage.createdAt)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col border-t border-[#E8E2DA] pt-4">
                <div className="text-xs text-[#8B8178] mb-2">Message</div>
                <div className="bg-[#FAF6F1] p-4 text-sm text-[#1A1A1A] rounded overflow-y-auto flex-1 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-[#8B8178]">
              <Eye className="h-8 w-8 text-[#8B8178]/40 mb-2" />
              <p className="text-sm">Select an inquiry to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
